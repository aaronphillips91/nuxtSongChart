import chords from "~/assets/json/chords.json";

export function triggerFunction(section) {
  const text = section.content.value;
  const formattedSection = convertToChordsAndLyrics(text);
  return formattedSection;
}

function convertToChordsAndLyrics(input) {
  const lines = input.split("\n");
  let formattedSection = "<div class='song'>";

  for (const line of lines) {
    const { notes, lyrics } = splitNotesAndLyrics(line);
    formattedSection += `<div class='line'>`;
    formattedSection += `<div class='font-mono font-bold chords text-primary-500'>${notes}</div>`;
    formattedSection += `<div class='font-mono lyrics'>${lyrics}</div>`;
    formattedSection += `</div>`;
  }

  formattedSection += "</div>";
  return formattedSection;
}

function splitNotesAndLyrics(c) {
  const parts = c.split(/(\[[^\]]+\])/);
  return parts.reduce(
    function (acc, curr) {
      if (curr.startsWith("[") && curr.endsWith("]")) {
        const cleanNote = curr.replace(/[[\]]/g, "");
        const offset = acc.lyrics.length - acc.notes.length + cleanNote.length;
        acc.notes += cleanNote.padStart(offset, " ");
      } else {
        acc.lyrics += curr;
      }
      return acc;
    },
    { notes: "", lyrics: "" }
  );
}

export function convertChordsToNumbers(key, chord, variation) {}
