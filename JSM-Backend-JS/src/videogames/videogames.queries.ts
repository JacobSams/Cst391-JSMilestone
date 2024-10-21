export const vgQueries = {
    readVideogames: "SELECT * FROM videogames",
    createVideogame: "INSERT INTO videogames (`Title`, `Developer`, `Rating`, `Price`) VALUES (?, ?, ?, ?);",
    updateVideogame: "UPDATE videogames SET `Title` = ?, `Developer` = ?, `Rating` = ?, `Price` = ? WHERE `ID` = ?;",
    deleteVideogame: "DELETE FROM videogames WHERE ID = ?;"
}