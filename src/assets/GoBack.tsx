import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const GoBack = (props: SvgProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={20}
      fill="none"
      {...props}>
      <Path
        fill="#111"
        d="M1.753 9.607c0 .335.128.62.394.876l7.677 7.51c.207.218.483.326.798.326.64 0 1.142-.492 1.142-1.142 0-.315-.128-.6-.345-.817L4.5 9.607l6.92-6.752c.217-.227.345-.512.345-.827 0-.64-.502-1.132-1.142-1.132-.315 0-.59.108-.798.325L2.147 8.73a1.206 1.206 0 0 0-.394.876Z"
      />
    </Svg>
  );
};
