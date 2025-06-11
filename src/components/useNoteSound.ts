


export function useNoteSound(){
  const play = (note: string) => {
    const audio = new Audio(`/sounds/${note}.mp3`);
   
    audio.play();
  };
  return { play };
}