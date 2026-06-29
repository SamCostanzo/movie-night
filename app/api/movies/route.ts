export function GET() {
  return Response.json([
    { id: 1, title: "Blade Runner", year: 1982, director: "Timmy Two-Chains" },
    { id: 2, title: "Dune", year: 2021, director: "Your Mom" },
    { id: 3, title: "School of Rock", year: 2003, director: "Sammy Hagar" },
    { id: 4, title: "Lord of the Rings: The Fellowship of the Ring", year: 2001, director: "Tommy Flipperville" },
    { id: 5, title: "Lord of the Rings: The Two Towers", year: 2002, director: "Allie Hazelnut" },
  ]);
}
