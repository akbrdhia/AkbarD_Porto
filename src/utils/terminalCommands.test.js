import assert from 'node:assert';
import { processCommand } from './terminalCommands.js';

// Mock PERSONAL_INFO
// Since we are running in Node, and terminalCommands.js imports from portfolioData.js
// we might need to be careful about the environment.
// However, processCommand only uses PERSONAL_INFO in "whoami", "contact" cases.
// Our test case for "unknown command" doesn't use it.

async function testUnknownCommand() {
  console.log('Testing unknown command...');
  let historyUpdated = false;
  const setTerminalHistory = (updateFn) => {
    historyUpdated = true;
    const previousHistory = [];
    const newHistory = updateFn(previousHistory);
    assert.deepStrictEqual(newHistory, [
      { type: "output", text: "" },
      { type: "error", text: `✗ Command not found: unknown-cmd` },
      { type: "error", text: '  Type "help" for available commands.' },
    ]);
  };

  processCommand(
    'unknown-cmd',
    setTerminalHistory,
    () => {},
    () => {},
    () => {},
    () => {},
    '~/portfolio'
  );

  assert.strictEqual(historyUpdated, true, 'setTerminalHistory should have been called');
  console.log('✅ Unknown command test passed');
}

async function testEmptyCommand() {
  console.log('Testing empty command...');
  let historyUpdated = false;
  const setTerminalHistory = () => {
    historyUpdated = true;
  };

  processCommand(
    '',
    setTerminalHistory,
    () => {},
    () => {},
    () => {},
    () => {},
    '~/portfolio'
  );

  assert.strictEqual(historyUpdated, false, 'setTerminalHistory should NOT have been called for empty command');
  console.log('✅ Empty command test passed');
}

async function runTests() {
  try {
    await testUnknownCommand();
    await testEmptyCommand();
    console.log('All tests passed! 🎉');
  } catch (error) {
    console.error('❌ Test failed:');
    console.error(error);
    process.exit(1);
  }
}

runTests();
