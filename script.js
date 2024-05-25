// Xanaları və reset düyməsini seçir
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");

// Başlanğıc dəyərləri təyin edir
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Xanalara kliklənəndə işləyəcək funksiyanı təyin edir
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell));
  // Oyun bitdikdən sora random olaq bir xana secir ve X sı  ora əlavə edir
  // cell.addEventListener("click", function () {
  //   handleCellClick(this);
  // });
});

// Oyunu sıfırlayan funksiya yazırıq
function resetGame() {
  // Oyun qutusunu təmizləyirik
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  // Xanaların içindəkini təmizləyirik
  cells.forEach((cell) => (cell.textContent = ""));
}

// Reset düyməsinə kliklənəndə işləyəcək funksiyanı təyin edir
resetButton.addEventListener("click", resetGame);

// Xanalara kliklənəndə ediləcək əməliyyatları əhatə edən funksiya
function handleCellClick(cell) {
  const index = cell.getAttribute("data-index");
  if (gameBoard[index] === "") {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    // Oyunun qazanılıb qazanılmadığını yoxlayır
    if (checkWin()) {
      // Qalib oyunçunu bildirir
      alert(`${currentPlayer} wins!`);
      // Oyunu sıfırlayır
      resetGame();
    } else if (gameBoard.every((cell) => cell !== "")) {
      // Bərabərlik vəziyyətini yoxlayır
      alert("Bərabər!");
      // Oyunu sıfırlayır yenə
      resetGame();
    } else {
      // Növbəti oyunçunu təyin edir
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Oyunun qazanılıb qazanılmadığını yoxlayan funksiya yazırıq burdada
function checkWin() {
  // Burda sətirləri yoxlayır
  for (let row = 0; row < 3; row++) {
    if (
      gameBoard[row * 3] !== "" &&
      gameBoard[row * 3] === gameBoard[row * 3 + 1] &&
      gameBoard[row * 3] === gameBoard[row * 3 + 2]
    ) {
      return true;
    }
  }
  // Burda sütunları yoxla
  for (let col = 0; col < 3; col++) {
    if (
      gameBoard[col] !== "" &&
      gameBoard[col] === gameBoard[col + 3] &&
      gameBoard[col] === gameBoard[col + 6]
    ) {
      return true;
    }
  }
  // Burda isə carpazları yoxla
  if (
    gameBoard[0] !== "" &&
    gameBoard[0] === gameBoard[4] &&
    gameBoard[0] === gameBoard[8]
  ) {
    return true;
  }
  if (
    gameBoard[2] !== "" &&
    gameBoard[2] === gameBoard[4] &&
    gameBoard[2] === gameBoard[6]
  ) {
    return true;
  }
  // Qalib yoxdursa false qaytarır
  return false;
}
