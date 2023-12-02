import React from 'react';



type Props = {
  keyword: string;
};

export default function Keyword({ keyword }: Props) {
  
  return <div>{keyword}</div>;
}
