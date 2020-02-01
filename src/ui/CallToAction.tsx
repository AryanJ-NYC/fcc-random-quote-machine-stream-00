import React from 'react';

const CallToAction: React.FC<Props> = props => (
  <button
    className="p-4 text-gray-100 bg-indigo-700 rounded focus:outline-none focus:shadow-outline"
    {...props}
  >
    <span className="text-indigo-100">{props.children}</span>
  </button>
);

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default CallToAction;
