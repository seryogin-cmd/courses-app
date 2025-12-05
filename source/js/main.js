window.addEventListener("DOMContentLoaded", () => {
  const courses = [
    {
      link: "#",
      img: "img/courses/image_1.jpg",
      badge: "Marketing",
      title: "The Ultimate Google Ads Training Course",
      price: "$100",
      speaker: "by Jerome Bell",
    },
    {
      link: "#",
      img: "img/courses/image_2.jpg",
      badge: "Management",
      title: "Product Management Fundamentals",
      price: "$480",
      speaker: "by Marvin McKinney",
    },
    {
      link: "#",
      img: "img/courses/image_3.jpg",
      badge: "HR & Recruting",
      title: "HR  Management and Analytics",
      price: "$200",
      speaker: "by Leslie Alexander Li",
    },
    {
      link: "#",
      img: "img/courses/image_4.jpg",
      badge: "Marketing",
      title: "Brand Management & PR Communications",
      price: "$530",
      speaker: "by Kristin Watson",
    },
    {
      link: "#",
      img: "img/courses/image_5.jpg",
      badge: "Design",
      title: "Graphic Design Basic",
      price: "$500",
      speaker: "by Guy Hawkins",
    },
    {
      link: "#",
      img: "img/courses/image_6.jpg",
      badge: "Management",
      title: "Business Development Management",
      price: "$400",
      speaker: "by Dianne Russell",
    },
    {
      link: "#",
      img: "img/courses/image_7.jpg",
      badge: "Development",
      title: "Highload Software Architecture",
      price: "$600",
      speaker: "by Brooklyn Simmons",
    },
    {
      link: "#",
      img: "img/courses/image_8.jpg",
      badge: "HR & Recruting",
      title: "Human Resources – Selection and Recruitment",
      price: "$150",
      speaker: "by Kathryn Murphy",
    },
    {
      link: "#",
      img: "img/courses/image_9.jpg",
      badge: "Design",
      title: "User Experience. Human-centered Design",
      price: "$240",
      speaker: "by Cody Fisher",
    },
  ];

  let currentCategory = "All";
  let currentSearch = "";

  const createCard = (course) => {
    const template = document.getElementById("card");
    const card = template.content.cloneNode(true);

    const img = card.querySelector(".courses__img img");
    const badge = card.querySelector(".courses__badge");

    img.src = course.img;
    img.alt = course.title;

    badge.textContent = course.badge;

    card.querySelector(".courses__link").href = course.link;
    card.querySelector(".courses__subtitle").textContent = course.title;
    card.querySelector(".courses__price").textContent = course.price;
    card.querySelector(".courses__speaker").textContent = course.speaker;

    switch (course.badge) {
      case "Design":
        badge.classList.add("courses__badge--radical-red");
        break;
      case "HR & Recruting":
        badge.classList.add("courses__badge--warning");
        break;
      case "Development":
        badge.classList.add("courses__badge--medium-slate-blue");
        break;
      case "Management":
        badge.classList.add("courses__badge--info");
        break;
      case "Marketing":
        badge.classList.add("courses__badge--success");
        break;
      default:
        break;
    }

    return card;
  };

  const filterCourses = () => {
    return courses.filter((course) => {
      const categoryMatch =
        currentCategory === "All" || course.badge === currentCategory;

      const searchMatch = course.title
        .toLowerCase()
        .includes(currentSearch.toLowerCase());

      return categoryMatch && searchMatch;
    });
  };

  const renderCards = () => {
    const container = document.querySelector(".courses__list");
    container.innerHTML = "";

    const filteredCourses = filterCourses();

    if (filteredCourses.length === 0) {
      container.innerHTML = `
        <li>Not found</li>
      `;
    }

    filteredCourses.forEach((course) => {
      const card = createCard(course);
      container.appendChild(card);
    });
  };

  const setupFilterButtons = () => {
    const buttons = document.querySelectorAll(".tabs__btn");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        buttons.forEach((btn) => btn.classList.remove("tabs__btn--active"));

        e.target.classList.add("tabs__btn--active");

        const category = button.textContent.trim();

        currentCategory = category;

        renderCards();
        updateCounters();
      });
    });
  };

  const countCoursesCategory = () => {
    const counts = {
      All: courses.length,
      Marketing: 0,
      Management: 0,
      "HR & Recruting": 0,
      Design: 0,
      Development: 0,
    };

    courses.forEach((course) => {
      if (counts.hasOwnProperty(course.badge)) {
        counts[course.badge]++;
      }
    });

    return counts;
  };

  const updateCounters = () => {
    const counts = countCoursesCategory();
    const buttons = document.querySelectorAll(".tabs button");
    const visibleCounts = { ...counts };

    if (currentSearch) {
      Object.keys(visibleCounts).forEach((category) => {
        const filtered = courses.filter((course) => {
          const categoryMatch = category === "All" || course.badge === category;

          const searchMatch = course.title
            .toLowerCase()
            .includes(currentSearch.toLowerCase());

          return categoryMatch && searchMatch;
        });

        visibleCounts[category] = filtered.length;
      });
    }

    buttons.forEach((button) => {
      const buttonText = button.textContent.trim();

      if (visibleCounts.hasOwnProperty(buttonText)) {
        button.dataset.countCategory = visibleCounts[buttonText];
      }
    });
  };

  const searchCourses = () => {
    const searchInput = document.querySelector(".search input");

    let timeoutId;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        currentSearch = e.target.value.trim();

        renderCards();
        updateCounters();
      }, 300);
    });
  };

  const init = () => {
    searchCourses();
    setupFilterButtons();
    renderCards();
    updateCounters();

    document.querySelector(".tabs button").classList.add("tabs__btn--active");
  };

  init();
});
