import { useState, useRef } from "react";
import { useClickAway } from "react-use";

import { DROP_DOWN_LIST } from "./data";

import styled from "styled-components";
import { ArrowButton } from "assets/svgs";

const Dropdown = ({ dropDownFunction }) => {
  const [selected, setSelected] = useState("좋아요 순");
  const [isListOpen, setIsListOpen] = useState(false);
  const outsideRef = useRef(null);

  const handleSelectedClick = () => {
    setIsListOpen((prev) => !prev);
  };

  const handleItemClick = (e) => {
    const item = e.currentTarget.title;
    const itemValue = e.currentTarget.value;

    setSelected(item);
    dropDownFunction(itemValue);
    setIsListOpen(false);
  };

  useClickAway(outsideRef, () => {
    setIsListOpen(false);
  });

  const dropdownList = DROP_DOWN_LIST.map((item) => (
    <Li key={item.text}>
      <button
        type="button"
        title={item.text}
        onClick={handleItemClick}
        value={item.value}
      >
        {item.text}
      </button>
    </Li>
  ));

  return (
    <DropdownBox ref={outsideRef}>
      <DropdownButton onClick={handleSelectedClick}>
        <Input type="text" value={selected} readOnly />
        <ArrowButton />
      </DropdownButton>
      {isListOpen && (
        <MenuWrapper>
          <ul>{dropdownList}</ul>
        </MenuWrapper>
      )}
    </DropdownBox>
  );
};

export default Dropdown;

const DropdownBox = styled.div`
  position: relative;
  width: 120px;
  margin-bottom: 10px;
`;

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
`;

const Input = styled.input`
  width: 80%;
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.colors.white};
  font-size: 13px;
`;

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 6%);
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 14px;

  button {
    width: 100%;
    text-align: left;
    border: none;
    background: none;
  }

  &:hover {
    button {
      font-weight: 600;
    }
  }
`;
