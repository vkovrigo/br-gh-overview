import { Commit } from './commit';

export const COMMITS: Commit[] = [
  {
    id: 'MDY6Q29tbWl0MTAyNzAyNTA6NTE4Y2U5YzI1ZjE4MDc1MjE0Y2I1NzJlN2RjMjQwNTk4MDkwZTY0OA==',
    message: `Rename 17 to 18 in warnings (#19031)\n\nWe're not really supposed to refer to future versions by numbers.\r\n\r\nThese will all slip so these numbers don't make sense anymore.`
  },
  {
    id: 'MDY6Q29tbWl0MTAyNzAyNTA6NDk4NWJiMGE4MGY1Y2JlYWE2MWQyMWE3ZGFmN2RhNWVjZmYyZDg5Mg==',
    message: `Remove ReactComponentTreeHook from internals (#19032)\n\nWe don't really support mixing minor versions anymore anyway. But seems\r\nsafe to remove in 17.`
  }
];
