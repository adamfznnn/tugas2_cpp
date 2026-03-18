const API_URL = "http://136.116.226.198:3000/api/v1/notes";

document.addEventListener("DOMContentLoaded", () => {
  getNotes();
});

const formulir = document.querySelector("#user-form");

formulir.addEventListener("submit", async (e) => {
  e.preventDefault();

  const elemenName = document.querySelector("#name");
  const elemenEmail = document.querySelector("#email");

  const judul = elemenName.value.trim();
  const isi = elemenEmail.value.trim();
  const id = elemenName.dataset.id || "";

  if (!judul || !isi) return;

  try {
    if (id === "") {
      await axios.post(API_URL, { judul, isi });
    } else {
      await axios.put(`${API_URL}/${id}`, { judul, isi });
    }

    // Reset form
    elemenName.dataset.id = "";
    elemenName.value = "";
    elemenEmail.value = "";

    getNotes(); // Refresh tabel otomatis
  } catch (error) {
    console.error("Error simpan:", error);
    alert("Gagal simpan! Cek koneksi ke port 3000.");
  }
});

async function getNotes() {
  try {
    const response = await axios.get(API_URL);
    const notes = response.data?.data || [];
    const table = document.querySelector("#table-user");

    let tampilan = "";
    notes.forEach((note, index) => {
      tampilan += `
                <tr>
                    <td>${index + 1}</td>
                    <td class="name">${note.judul}</td>
                    <td class="email">${note.isi}</td>
                    <td><button data-id="${note.id}" class="btn-edit">Edit</button></td>
                    <td><button data-id="${note.id}" class="btn-hapus">Hapus</button></td>
                </tr>`;
    });
    table.innerHTML = tampilan;
    inisialisasiTombol();
  } catch (error) {
    console.error("Gagal ambil data:", error);
  }
}

function inisialisasiTombol() {
  // Tombol Hapus
  document.querySelectorAll(".btn-hapus").forEach(btn => {
    btn.onclick = async () => {
      if (confirm("Hapus?")) {
        await axios.delete(`${API_URL}/${btn.dataset.id}`);
        getNotes();
      }
    };
  });
  // Tombol Edit
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.onclick = () => {
      const row = btn.closest("tr");
      document.querySelector("#name").dataset.id = btn.dataset.id;
      document.querySelector("#name").value = row.querySelector(".name").innerText;
      document.querySelector("#email").value = row.querySelector(".email").innerText;
    };
  });
}