const accordionItems = document.querySelectorAll(".accordion-item");

      accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");
        const arrow = item.querySelector(".accordion-arrow");

        header.addEventListener("click", () => {
          const isAlreadyOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

          // Tutup semua item
          accordionItems.forEach(otherItem => {
            otherItem.querySelector(".accordion-content").style.maxHeight = "0px"; 
            otherItem.querySelector(".accordion-arrow").classList.remove("rotate-180"); 
          });

          // Buka item yang diklik (jika tadi tertutup)
          if (!isAlreadyOpen) {
            content.style.maxHeight = content.scrollHeight + "px"; 
            arrow.classList.add("rotate-180"); 
          }
        });
      });


      // --- SCRIPT UNTUK TAB "KEUNIKAN CABANG" ---
      document.addEventListener("DOMContentLoaded", function () {
        const tabs = document.querySelectorAll(".tab-button");
        const tabContents = document.querySelectorAll(".tab-content");

        tabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            tabs.forEach((item) => {
              item.classList.remove(
                "border",
                "border-brand-blue",
                "text-gray-900"
              );
              item.classList.add("text-brand-muted");
            });
            tabContents.forEach((content) => {
              content.classList.add("hidden");
            });

            tab.classList.add("border", "border-brand-blue", "text-gray-900");
            tab.classList.remove("text-brand-muted");
            document.getElementById(tab.dataset.tab).classList.remove("hidden");
          });
        });
      });

          function toggleDropdown(id) {
    const dropdown = document.getElementById(`dropdown-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);

    if (dropdown.classList.contains('max-h-0')) {
      dropdown.classList.remove('max-h-0', 'opacity-0');
      dropdown.classList.add('max-h-[1000px]', 'opacity-100');
      arrow.classList.add('rotate-180');
    } else {
      dropdown.classList.add('max-h-0', 'opacity-0');
      dropdown.classList.remove('max-h-[1000px]', 'opacity-100');
      arrow.classList.remove('rotate-180');
    }
  }