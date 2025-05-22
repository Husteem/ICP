export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getMessage' : IDL.Func([], [IDL.Text], ['query']),
    'neutralizeMessage' : IDL.Func([], [IDL.Text], []),
    'setMessage' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
