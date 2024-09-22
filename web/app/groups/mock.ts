export interface GroupTileData {
  id: string;
  title: string;
  members: number;
  createdAt: Date;
  description: string;
}

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis imperdiet risus. Duis sem lorem, ullamcorper eu hendrerit in, ultrices eget odio. Donec et sem massa. Morbi pellentesque, libero vel luctus sodales, diam urna pharetra nulla, id luctus turpis magna vitae velit. Vivamus quam mi, pulvinar in elit id, viverra pharetra neque. Integer sed diam eget magna condimentum tincidunt. Proin venenatis fermentum mattis. Sed dapibus rutrum ultricies.
Vivamus id commodo lectus. Donec vestibulum, arcu ut finibus porta, diam urna rhoncus eros, ut viverra ante velit sit amet leo. Donec luctus iaculis volutpat. Nulla laoreet, lorem vel vestibulum congue, dolor lacus consectetur augue, vitae convallis nibh mauris quis risus. Maecenas congue ex eget enim consequat, vitae pulvinar augue commodo. Praesent tristique tristique sagittis. Pellentesque ac accumsan leo, at mollis sapien. In hac habitasse platea dictumst. Vestibulum venenatis rhoncus eleifend. Nulla vel fringilla sapien. Pellentesque vel dignissim mi, ac consectetur metus. Donec nec dui cursus, volutpat arcu nec, lacinia quam. Phasellus sed arcu in nunc porta pellentesque.
Donec quis lacinia nunc. Ut semper bibendum libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam vestibulum nulla lorem, pretium venenatis diam interdum ut. Vivamus nulla risus, bibendum sit amet ultricies eget, lacinia eget urna. Integer non rhoncus odio, vel sagittis augue. Vestibulum non sapien tellus. Integer vehicula metus quis orci ornare convallis. Morbi sed mattis odio, eu rhoncus sapien. Mauris placerat aliquam felis at tempor. Sed non molestie arcu, ut venenatis lacus.
In malesuada arcu eget magna semper maximus. In et urna et augue pulvinar luctus. Curabitur suscipit ligula massa, ac tempus nibh interdum ut. Maecenas volutpat dapibus lectus, in efficitur dolor. Aenean fringilla pellentesque faucibus. Aenean euismod porttitor suscipit. Morbi lacinia dolor id nibh pharetra, non facilisis mi lobortis. Mauris mauris lorem, bibendum nec quam id, vulputate rutrum lacus. Proin gravida sapien in augue aliquam, sed luctus lorem tempus.
Sed pellentesque lacinia nisi sed fringilla. Vivamus eleifend lorem vel urna accumsan, in scelerisque arcu viverra. Curabitur at molestie justo, sit amet facilisis velit. Morbi commodo vel purus sed blandit. Sed pellentesque risus eget faucibus luctus. Proin quis velit eu ex gravida auctor. Vestibulum id bibendum nisl. Aenean pharetra varius felis, eu imperdiet lorem ultricies eu.`;

const getRandomLoremIpsumSentenses = (n: number) => {
  let sentences = loremIpsum.match(/[^\.!\?]+[\.!\?]+/g)!;
  let shuffled = sentences.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n).join(" ");
};

const getLoremIpsumSentenses = (s: number, startAt: number = 0) => {
  let sentences = loremIpsum.split(".");

  return sentences.slice(startAt, startAt + s).join(". ");
};

export const data: GroupTileData[] = [
  {
    id: "1",
    title: getLoremIpsumSentenses(2, 0),
    description: getLoremIpsumSentenses(2, 2),
    members: 10,
    createdAt: new Date("10.10.2020"),
  },
  {
    id: "2",
    title: getLoremIpsumSentenses(4, 2),
    description: getLoremIpsumSentenses(4, 4),
    members: 63,
    createdAt: new Date("10.10.2021"),
  },
  {
    id: "3",
    title: getLoremIpsumSentenses(6, 4),
    description: getLoremIpsumSentenses(6, 6),
    members: 127,
    createdAt: new Date("10.10.2022"),
  },
  {
    id: "4",
    title: getLoremIpsumSentenses(8, 6),
    description: getLoremIpsumSentenses(8, 8),
    members: 1,
    createdAt: new Date("10.10.2023"),
  },
  {
    id: "5",
    title: getLoremIpsumSentenses(10, 8),
    description: getLoremIpsumSentenses(10, 10),
    members: 3120,
    createdAt: new Date("10.10.2024"),
  },
];
