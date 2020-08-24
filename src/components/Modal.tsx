import React from "react";
import styled from "styled-components";
import SCModal, { ModalProvider } from "styled-react-modal";
import SvgIcon from "./SvgIcon";

const StyledModal = SCModal.styled`
  width: 30rem;
  border-radius: 10px;
  height: 30rem;
  font-size: inherit;
  font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
  padding: 0;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  opacity: ${(props) => props.opacity};
  transition: opacity ease 500ms;
`;

const Header = styled.div`
  width: 100%;
  border-radius: 10px;
  height: 36px;
  background-color: #f3f3f3;
  font-family: inherit;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const Body = styled.div`
  height: calc(100% - 36px);
  overflow-y: scroll;
  overflow-x: auto;
  font-family: inherit;
  padding: 0px 24px 25px;
  margin: 0px;
  box-sizing: border-box;
`;

export interface ModalProps {
  children: React.ReactElement;
  isOpen: boolean;
  headerTitle: string;
  toggleModal: (e?: any) => void;
}

const Modal = React.memo(({ children, isOpen, toggleModal, headerTitle }: ModalProps) => {
  const [opacity, setOpacity] = React.useState(0);

  return (
    <StyledModal
      isOpen={isOpen}
      afterOpen={() => setOpacity(1)}
      beforeClose={() => setOpacity(0)}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      opacity={opacity}
      backgroundProps={{ opacity }}
    >
      <Header>
        {headerTitle}
        <SvgIcon name="close" onClick={toggleModal} />
      </Header>
      <Body>
        {children}
      </Body>
    </StyledModal>
  );
});

export {
  Modal,
  ModalProvider,
};
