
export type Udhetim = {
  id: string;
  shoferi: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
};

export const udhetimet: Udhetim[] = [
  {
    id: "1",
    shoferi: "Arnisa A.",
    nisja: "Fushë Kosovë",
    destinacioni: "AAB",
    ora: "07:30",
    vendtakimi: "Qendra e Fushë Kosovës",
    vende: 3,
  },
  {
    id: "2",
    shoferi: "Sara K.",
    nisja: "Prishtinë",
    destinacioni: "AAB",
    ora: "08:50",
    vendtakimi: "Stacioni i autobusëve",
    vende: 1,
  },
  {
    id: "3",
    shoferi: "Fiona A.",
    nisja: "Lipjan",
    destinacioni: "AAB",
    ora: "09:00",
    vendtakimi: "Qendra e Lipjanit",
    vende: 0,
  },
];

export function gjejUdhetimin(id: string) {
  return udhetimet.find((udhetim) => udhetim.id === id);
}
