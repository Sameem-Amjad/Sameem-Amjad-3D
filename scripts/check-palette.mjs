/* Ranking checks for the command palette (src/utils/palette.js).
 *
 * The matcher decides what a visitor sees first when they type into ⌘K, so
 * its ordering rules are pinned here: label prefix beats word prefix beats
 * substring beats stack keyword beats subtitle beats fuzzy. Plain Node, no
 * test framework — the module is import-free by design so it runs outside
 * Vite. `npm run check:palette`. Exits 1 on the first failed assertion.
 */

import assert from "node:assert/strict";
import { filterCommands, GROUPS } from "../src/utils/palette.js";

const cmds = [
  { id: "nav-home", group: "navigate", label: "Home", sub: "Back to the top", keywords: ["start", "hero"] },
  { id: "nav-contact", group: "navigate", label: "Contact", sub: "Send a message", keywords: ["message", "hire"] },
  { id: "p-loopedin", group: "case-studies", label: "Loopedin", sub: "Social + events platform for 2.4M+ users", keywords: ["Node.js · Microservices · AWS", "Platforms", "TypeScript", "Node.js", "Socket.io", "Redis", "AWS"] },
  { id: "p-dooz", group: "case-studies", label: "Dooz Inspected Cars", sub: "Verified used-car marketplace", keywords: ["Angular · NestJS · React Native", "Mobile", "Angular", "NestJS", "React Native", "PostgreSQL"] },
  { id: "p-koor", group: "case-studies", label: "Koor Food Delivery", sub: "Homemade-food marketplace · 120k+ orders", keywords: ["React Native · NestJS · AWS", "Mobile"] },
  { id: "p-cafe", group: "builds", label: "Café Noir", sub: "Coffee shop site", keywords: ["Web"] },
  { id: "act-book", group: "connect", label: "Book a call", sub: "Free · 30 minutes", keywords: ["schedule", "meeting", "hire"] },
  { id: "act-copy", group: "connect", label: "Copy email address", sub: "x@y.z", keywords: ["clipboard"] },
];
const ids = (r) => r.map((c) => c.id);
const snapshot = ids(cmds);

// Empty and whitespace-only queries return the authored list untouched, so
// the grouped view is stable.
assert.deepEqual(filterCommands(cmds, ""), cmds);
assert.deepEqual(filterCommands(cmds, "   "), cmds);

// Label prefix wins, case-insensitively.
assert.equal(ids(filterCommands(cmds, "loop"))[0], "p-loopedin");
assert.equal(ids(filterCommands(cmds, "LOOP"))[0], "p-loopedin");

// A later word of the label still counts as a prefix hit.
assert.equal(ids(filterCommands(cmds, "cars"))[0], "p-dooz");

// A technology name surfaces the projects built with it, and only those.
const nest = ids(filterCommands(cmds, "nestjs"));
assert.ok(nest.includes("p-dooz") && nest.includes("p-koor"), "nestjs should hit both NestJS projects");
assert.ok(!nest.includes("p-loopedin"), "nestjs must not hit a Node/AWS project");

// The subtitle is searchable too.
assert.ok(ids(filterCommands(cmds, "marketplace")).includes("p-dooz"));

// Every token must match somewhere.
assert.deepEqual(ids(filterCommands(cmds, "food delivery")), ["p-koor"]);
assert.deepEqual(ids(filterCommands(cmds, "food banana")), []);

// A shared keyword returns every command carrying it.
assert.deepEqual(new Set(ids(filterCommands(cmds, "hire"))), new Set(["nav-contact", "act-book"]));

// Typo tolerance: in-order subsequence on the label, but never for tokens
// short enough to match everything.
assert.ok(ids(filterCommands(cmds, "lpdin")).includes("p-loopedin"));
assert.equal(ids(filterCommands(cmds, "xq")).length, 0);

// Accents fold: "cafe" finds "Café".
assert.equal(ids(filterCommands(cmds, "cafe"))[0], "p-cafe");

// Ties keep authored order: both prefix-match "co", Contact was authored first.
const co = ids(filterCommands(cmds, "co"));
assert.equal(co[0], "nav-contact");
assert.equal(co[1], "act-copy");

// The input is never mutated.
assert.deepEqual(ids(cmds), snapshot);

// Group order is what the palette renders when the field is empty.
assert.deepEqual(GROUPS.map((g) => g.key), ["navigate", "case-studies", "builds", "connect"]);

console.log("check-palette: all ranking assertions passed");
