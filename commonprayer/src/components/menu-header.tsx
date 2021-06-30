import h from "https://cdn.skypack.dev/vhtml@2.2.0";

type MenuHeaderProps = {
  title: string;
}

export function MenuHeader({ title } : MenuHeaderProps) {
  return <header class="menu-header">
    <h2>{title}</h2>
    <button class="close">
      <img src="/assets/icon/times-solid.svg"/>
      <span class="visually-hidden">Close</span>
    </button>
  </header>
}