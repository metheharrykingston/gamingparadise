import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

// Build checks only validate module syntax. Render smoke tests also execute JSX
// and catch unresolved names such as a missing Lucide component import.
test("all public website routes render without crashing", { timeout: 60000 }, async () => {
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
    logLevel: "error"
  });
  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
    for (const route of ["/", "/membership", "/gta6", "/join", "/my-pass", "/privacy"]) {
      const markup = renderToString(
        React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App))
      );
      assert.ok(markup.includes("PIXEL"), route + ": site brand missing");
      assert.ok(markup.length > 500, route + ": page unexpectedly empty");
      if (route === "/") {
        assert.match(markup, /PS5 GAMING/);
        assert.match(markup, /G29 RACING/);
        assert.match(markup, /SAVE/);
      }
    }
  } finally {
    await vite.close();
  }
});

test("booking wizard renders a dedicated game-selection step, never silently chooses a game", { timeout: 60000 }, async () => {
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
    logLevel: "error"
  });
  try {
    const { default: BookingWizard, buildMessage } = await vite.ssrLoadModule("/src/BookingWizard.jsx");
    const { sessions } = await vite.ssrLoadModule("/src/config.js");
    const ps5 = sessions.find(item => item.id === "ps5");
    const bookingDetails = {setup:ps5,game:ps5.games[1],duration:60,date:"2026-11-02",time:"10:00",name:"Guest",phone:"9876543210",players:"2",note:"",rate:100};
    const withoutSnack = buildMessage(bookingDetails);
    assert.doesNotMatch(withoutSnack,/snacks \/ drinks requested/i);
    const withSnack = buildMessage({...bookingDetails,note:"Extra controller",snack:"Tea and chips"});
    assert.match(withSnack,/Tea and chips/);
    assert.match(withSnack,/extra charge/i);
    assert.match(withSnack,/Extra controller/);
    const render = (props) => renderToString(React.createElement(BookingWizard, {
      onClose: () => {}, ...props
    }));
    const start = render({ initialConsole: "PS5" });
    assert.match(start, /CHOOSE YOUR/);
    assert.match(start, /ARENA/);
    assert.doesNotMatch(start, /YOUR SELECTION/);
    const multiplayer = render({ initialConsole: "PS5", initialGameId: "tekken8" });
    assert.match(multiplayer, /PICK YOUR/);
    assert.match(multiplayer, /WITH FRIENDS/);
    assert.match(multiplayer, /Tekken 8/);
    assert.match(multiplayer, /Number of local players/);
    const racing = render({ initialConsole: "G29 Racing Wheel", initialGameId: "forza5" });
    assert.match(racing, /Forza Horizon 5/);
    assert.match(racing, /ONE DRIVER PER WHEEL/);
    assert.doesNotMatch(racing, /WITH FRIENDS/);
  } finally {
    await vite.close();
  }
});
