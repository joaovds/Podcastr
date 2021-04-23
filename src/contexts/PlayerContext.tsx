import { createContext, ReactNode, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisode: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisode(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisode(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    const nextEpisodeIndex = currentEpisode + 1;
    if (nextEpisodeIndex < episodeList.length) {
      setCurrentEpisode(nextEpisodeIndex);
    }
  }

  function playPrevious() {
    const previousEpisodeIndex = currentEpisode - 1;
    if (previousEpisodeIndex >= 0) {
      setCurrentEpisode(previousEpisodeIndex);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisode,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        togglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
