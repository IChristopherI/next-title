import {
  AnimeSearch,
  FilterParamsAnime,
  getAnimeId,
  getAnimeList,
  getNewAnimeList,
} from "../services/anime-service.js";
import { saveAnime, saveEpisodes } from "../services/database-service.js";

import {
  getVideoEpisodes,
  getVideoSource,
} from "../services/video-service.js";

class AnimeController {
  async getAll(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 20;

      const anime = await getAnimeList(page, perPage);

      return res.json(anime);
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: err.message,
      });
    }
  }

  async getNewAll(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 20;

      const anime = await getNewAnimeList(page, perPage);

      return res.json(anime);
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: err.message,
      });
    }
  }

  async getOne(req, res) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: "Invalid anime id",
        });
      }

      const anime = await getAnimeId(id);
      await saveAnime(anime)

      if (!anime) {
        return res.status(404).json({
          message: "Anime not found",
        });
      }

      return res.json(anime);
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }

  async getEpisodes(req, res) {
    try {
      const anilistId = Number(req.params.id);
      const anime = await getAnimeId(anilistId);

      if (!anime) {
        return res.status(404).json({
          message: "Anime not found",
        });
      }

      let episodes = [];

      try {
        episodes = await getVideoEpisodes(anime);
        await saveEpisodes(anime, episodes)
      } catch (err) {
        console.log("AniLibria is not available:", err.message);
      }

      if (episodes.length) {
        return res.json(
          episodes.map((episode, index) => ({
            id: episode.id,
            ordinal: episode.number || index + 1,
            name: episode.title || null,
            provider: episode.provider || "unknown",
            previewUrl: episode.previewUrl,
          }))
        );
      }

      return res.json([]);
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }

  async getEpisode(req, res) {
    try {
      const anilistId = Number(req.params.id);

      const episodeNumber = Number(
        req.params.episode
      );

      const anime = await getAnimeId(anilistId);

      if (!anime) {
        return res.status(404).json({
          message: "Anime not found",
        });
      }

      let episodes = [];

      try {
        episodes = await getVideoEpisodes(anime);
      } catch (err) {
        console.log("AniLibria is not available:", err.message);
      }

      const episode =
        episodes.find(
          (item, index) =>
            Number(item.number || index + 1) === episodeNumber
        );

      if (!episode) {
        return res.status(404).json({
          message: "Episode not found",
        });
      }

      const videoUrl = await getVideoSource(episode);

      if (!videoUrl) {
        return res.status(404).json({
          message: "Video source not found",
        });
      }

      return res.json({
        animeId: anilistId,
        episode: episodeNumber,
        provider: episode.provider || "unknown",
        videoUrl,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }
  async search(req, res) {
    try {
      const query = req.query.query;

      if (!query) {
        return res.status(400).json({
          message: "Search query is required",
        });
      }

      const anime = await AnimeSearch(query);

      return res.json(anime);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async filters(req, res) {
    try {
      const genresQuery = req.query.genres;
      const yearQuery = req.query.year;
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 20;

      const genres = genresQuery ? genresQuery.split(",") : null;
      const year = yearQuery ? Number(yearQuery) : null;
      
       const anime = await FilterParamsAnime({
      genres,
      page,
      year,
      perPage,
    });
      return res.json(anime)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new AnimeController();
