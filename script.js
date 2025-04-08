function calculate() {
    const dobInput = document.getElementById("dob").value;
    if (!dobInput) {
      alert("Please select your date of birth.");
      return;
    }
  
    const birthDate = new Date(dobInput);
    const today = new Date();
  
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    // Countdown to next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const timeDiff = nextBirthday - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    // Zodiac sign
    const zodiac = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);
  
    // Display results
    document.getElementById("age").textContent = `You are ${age} years old.`;
    document.getElementById("countdown").textContent = `🎉 ${daysLeft} day(s) left until your next birthday!`;
    document.getElementById("zodiac").textContent = `♈ Your zodiac sign is ${zodiac}.`;
  
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    resultDiv.classList.add("fade-in");
  
    // Confetti on birthday
    if (
      birthDate.getDate() === today.getDate() &&
      birthDate.getMonth() === today.getMonth()
    ) {
      confetti();
    }
  }
  
  function getZodiacSign(day, month) {
    const signs = [
      { sign: "Capricorn", from: [12, 22], to: [1, 19] },
      { sign: "Aquarius", from: [1, 20], to: [2, 18] },
      { sign: "Pisces", from: [2, 19], to: [3, 20] },
      { sign: "Aries", from: [3, 21], to: [4, 19] },
      { sign: "Taurus", from: [4, 20], to: [5, 20] },
      { sign: "Gemini", from: [5, 21], to: [6, 20] },
      { sign: "Cancer", from: [6, 21], to: [7, 22] },
      { sign: "Leo", from: [7, 23], to: [8, 22] },
      { sign: "Virgo", from: [8, 23], to: [9, 22] },
      { sign: "Libra", from: [9, 23], to: [10, 22] },
      { sign: "Scorpio", from: [10, 23], to: [11, 21] },
      { sign: "Sagittarius", from: [11, 22], to: [12, 21] },
    ];
  
    for (let s of signs) {
      const [fromMonth, fromDay] = s.from;
      const [toMonth, toDay] = s.to;
      if (
        (month === fromMonth && day >= fromDay) ||
        (month === toMonth && day <= toDay)
      ) {
        return s.sign;
      }
    }
    return "Unknown";
  }
  
 // Flatpickr calendar init
flatpickr("#dob", {
    dateFormat: "Y-m-d",
    maxDate: "today"
  });
  
  // Theme toggle
  const themeSwitch = document.getElementById("theme-switch");
  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
  