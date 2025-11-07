$(document).ready(function () {
    const API_KEY = "AIzaSyCqudUce2I7BXKvjd_RCntncKuHyCEQkLU"; 
    // Tetap menggunakan gemini-1.5-flash
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    const systemInstructionContent = `
        Anda adalah "Asisten IDN", AI ahli tentang 'IDN Boarding School'. 
        Aturan Ketat:
        1. Jawab HANYA pertanyaan seputar IDN Boarding School (profil, kurikulum, biaya, pendaftaran, asrama, ekstrakurikuler, fasilitas).
        2. Jika topik di luar IDN Boarding School, jawab dengan sopan: "Mohon maaf, saya hanya dapat menjawab pertanyaan yang berhubungan dengan IDN Boarding School."
        3. Berikan jawaban yang informatif, akurat, dan ramah dalam bahasa Indonesia yang baik.
        4. Jangan pernah mengulangi sapaan selamat datang.
        5. Jika ada yang bertanya tentang ppdb, berikan informasi terbaru tentang prosedur pendaftaran, persyaratan, dan tenggat waktu. atau arahkan mereka ke halaman "PPDB" arahkan ke "http://thepilars.jh-beon.cloud/Akademik_Smk/index.html".
        6. Gunakan nada yang profesional namun ramah, sesuai dengan citra IDN Boarding School.
        7. Jika ada yang bertanya tentang ekskul di IDN, maka jelaskan bahwa terdapat 2 tipe Ekskul, 1. Wajib, 2. Opsional, untuk yang wajib ada Silat, Berkuda, Berenang, Kayakan, Panahan & Cooking Class, dan yang opsional ada Basket, Hoverboard, & Skateboard.
        8. Jika ada yang bertanya tentang siapa pendiri IDN Boarding School, jelaskan bahwa pendirinya adalah Bapak Dedi Gunawan.
    `;

    let chatHistory = [];

    function formatResponse(text) {
        text = text.replace(/(\*\*|\*|```)/g, ''); 
        return text.replace(/\n/g, "<br>");
    }

    setTimeout(() => {
        const firstMessage = "Selamat datang di Asisten AI IDN! Ada yang bisa saya bantu seputar IDN Boarding School?";
        $("#chatBox").append(`<div class="w-full flex justify-start"><p class="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-[80%]"><strong>Asisten IDN:</strong><br>${firstMessage}</p></div>`);
        chatHistory.push({ role: "model", parts: [{ text: firstMessage }] });
    }, 500);

    $("#chatForm").submit(function (e) {
        e.preventDefault();
        const userInput = $("#userInput").val().trim();
        if (userInput === "") return;

        $("#chatBox").append(`<div class="w-full flex justify-end"><p class="bg-blue-500 text-white p-3 rounded-lg max-w-[80%]">${userInput}</p></div>`);
        $("#userInput").val("");
        $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);

        chatHistory.push({ role: "user", parts: [{ text: userInput }] });

        // Coba kirim systemInstruction sebagai bagian dari `contents` jika `systemInstruction` terpisah tidak bekerja
        // Ini akan membuat prompt lebih panjang tapi lebih kompatibel dengan endpoint v1beta
        const contentsToSend = [
            { role: "user", parts: [{ text: systemInstructionContent }] }, // Instruksi sistem sebagai bagian dari chat
            ...chatHistory
        ];


        $.ajax({
            url: `${API_URL}?key=${API_KEY}`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                // Mengirim instruksi sistem sebagai bagian dari `contents`
                contents: contentsToSend
            }),
            success: function (response) {
                if (response.candidates && response.candidates.length > 0 && response.candidates[0].content) {
                    const aiResponse = response.candidates[0].content.parts[0].text;
                    const formattedResponse = formatResponse(aiResponse);

                    $("#chatBox").append(`<div class="w-full flex justify-start"><p class="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-[80%]"><strong>Asisten IDN:</strong><br>${formattedResponse}</p></div>`);
                    
                    // Penting: hanya tambahkan respons AI yang asli ke chatHistory, bukan instruksi sistem
                    chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
                } else {
                    $("#chatBox").append(`<div class="w-full flex justify-start"><p class="bg-red-200 text-red-800 p-3 rounded-lg"><strong>Error:</strong> Maaf, AI tidak memberikan jawaban yang valid.</p></div>`);
                }
                $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
            },
            error: function (xhr, status, error) {
                console.error("Detail Error:", xhr.responseText);
                $("#chatBox").append(`<div class="w-full flex justify-start"><p class="bg-red-200 text-red-800 p-3 rounded-lg"><strong>Error:</strong> Maaf, terjadi kesalahan saat menghubungi server. Silakan periksa API Key Anda dan koneksi internet.</p></div>`);
                $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
            },
        });
    });
});