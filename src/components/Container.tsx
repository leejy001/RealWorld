import React, { PropsWithChildren } from "react";
import styled from "styled-components";

function Container({ children }: PropsWithChildren) {
  return <ResponsiveContainer>{children}</ResponsiveContainer>;
}

export default Container;

const ResponsiveContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  @media (min-width: 544px) {
    max-width: 576px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 940px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;
