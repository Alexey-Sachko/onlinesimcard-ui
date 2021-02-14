import PhilipinesFlag from "../../iconsComponents/PhilipinesFlag";
import RussiaFlag from "../../iconsComponents/RussiaFlag";
import KazahstanFlag from "../../iconsComponents/KazahstanFlag";
import UkraineFlag from "../../iconsComponents/UkraineFlag";
import UnitedKingdomFlag from "../../iconsComponents/UnitedKingdomFlag";
import UnitedStatesFlag from "../../iconsComponents/UnitedStatesFlag";
import FinlandFlag from "../../iconsComponents/FinlandFlag";
import LatviaFlag from "../../iconsComponents/LatviaFlag";
import NetherlandFlag from "../../iconsComponents/NetherlandFlag";
import SpainFlag from "../../iconsComponents/SpainFlag";
import SwedenFlag from "../../iconsComponents/SwedenFlag";
import DefaultFlag from "../../iconsComponents/DefaultFlag";

export default {
  7: {
    flagComp: <RussiaFlag />,
    regexp: /^(\d{3})(\d{3})(\d{2})(\d{2})/,
    mask: "($1) $2-$3-$4",
  },
  77: {
    flagComp: <KazahstanFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  380: {
    flagComp: <UkraineFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  63: {
    flagComp: <PhilipinesFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  44: {
    flagComp: <UnitedKingdomFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  1: {
    flagComp: <UnitedStatesFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  358: {
    flagComp: <FinlandFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  371: {
    flagComp: <LatviaFlag />,
    regexp: /^(\d{3})(\d{3})(\d{2})/,
    mask: "($1) $2-$3",
  },
  31: {
    flagComp: <NetherlandFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  34: {
    flagComp: <SpainFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  46: {
    flagComp: <SwedenFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
  default: {
    flagComp: <DefaultFlag />,
    regexp: /^(\d{3})(\d{3})(\d{3})/,
    mask: "($1) $2-$3",
  },
};
