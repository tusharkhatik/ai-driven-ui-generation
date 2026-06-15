// ============================================================================
// MUSIC PLAYER GENERATOR - Spotify-like Music Streaming UI
// ============================================================================

export class MusicPlayerGenerator {
  static generate(rng, colors, analysis = {}) {
    const playlists = this.generatePlaylists(rng, 5);
    const tracks = this.generateTracks(rng, 12);
    const currentTrack = this.generateCurrentTrack();

    return `
      <div class="music-player-wrapper">
        <!-- Sidebar -->
        <aside class="music-sidebar">
          <div class="music-logo">🎵 MusicHub</div>
          
          <nav class="music-nav">
            <a href="#" class="nav-item active">
              <span class="icon">🏠</span>
              <span>Home</span>
            </a>
            <a href="#" class="nav-item">
              <span class="icon">🔍</span>
              <span>Search</span>
            </a>
            <a href="#" class="nav-item">
              <span class="icon">📚</span>
              <span>Library</span>
            </a>
          </nav>

          <div class="playlists-section">
            <div class="section-header">
              <h3>Playlists</h3>
              <button class="add-btn">➕</button>
            </div>
            <div class="playlists-list">
              ${playlists.map(playlist => `
                <a href="#" class="playlist-item">
                  <span class="playlist-icon">${playlist.icon}</span>
                  <span>${playlist.name}</span>
                </a>
              `).join('')}
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="music-main">
          <!-- Top Bar -->
          <div class="music-topbar">
            <div class="topbar-left">
              <button class="nav-btn">←</button>
              <button class="nav-btn">→</button>
            </div>
            <div class="topbar-center">
              <input type="text" placeholder="🔍 Search songs, artists..." class="topbar-search">
            </div>
            <div class="topbar-right">
              <button class="user-btn">👤 Sign In</button>
            </div>
          </div>

          <!-- Current Playing Card -->
          <div class="now-playing-card" style="background: ${colors.gradient}">
            <div class="album-art">${currentTrack.albumArt}</div>
            <div class="track-info">
              <h2>${currentTrack.title}</h2>
              <p>${currentTrack.artist}</p>
              <p class="album">${currentTrack.album}</p>
            </div>
            <button class="like-btn">❤️</button>
          </div>

          <!-- Playback Controls -->
          <div class="playback-controls">
            <div class="volume-control">
              <span>🔊</span>
              <input type="range" min="0" max="100" value="70" class="volume-slider">
            </div>

            <div class="player-controls">
              <button class="control-btn">⏮️</button>
              <button class="control-btn play-btn">▶️</button>
              <button class="control-btn">⏭️</button>
              <button class="control-btn">🔀</button>
              <button class="control-btn">🔁</button>
            </div>

            <div class="progress-bar">
              <span class="current-time">2:35</span>
              <input type="range" min="0" max="100" value="35" class="progress-slider">
              <span class="duration">7:42</span>
            </div>
          </div>

          <!-- Tracks List -->
          <div class="tracks-section">
            <h3>Now Playing</h3>
            <div class="tracks-list">
              ${tracks.map((track, i) => `
                <div class="track-item ${i === 0 ? 'playing' : ''}">
                  <div class="track-number">${i + 1}</div>
                  <div class="track-album-art">${track.albumArt}</div>
                  <div class="track-details">
                    <h4>${track.title}</h4>
                    <p>${track.artist}</p>
                  </div>
                  <div class="track-duration">${track.duration}</div>
                  <button class="track-action">⋮</button>
                </div>
              `).join('')}
            </div>
          </div>
        </main>

        <!-- Right Sidebar -->
        <aside class="music-right-sidebar">
          <div class="lyrics-section">
            <h3>Lyrics</h3>
            <div class="lyrics-content">
              <p>🎵 Playing: ${currentTrack.title}</p>
              <p style="margin-top: 20px; line-height: 1.8;">
                Take me out tonight<br>
                Where there's music and there's people<br>
                And they're young and alive<br>
                Driving down the side streets<br>
                Speeding just for thrills...
              </p>
            </div>
          </div>

          <div class="recommendations-section">
            <h3>Recommended</h3>
            <div class="recommendations-list">
              <div class="recommendation-item">
                <span>📻 Related Artists</span>
              </div>
              <div class="recommendation-item">
                <span>🎧 Similar Songs</span>
              </div>
              <div class="recommendation-item">
                <span>🎼 Radio Station</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  static generatePlaylists(rng, count = 5) {
    const names = [
      'Chill Vibes',
      'Workout Mix',
      'Study Focus',
      'Party Night',
      'Road Trip'
    ];
    const icons = ['😎', '💪', '🧠', '🎉', '🚗'];

    const playlists = [];
    for (let i = 0; i < count; i++) {
      playlists.push({
        name: names[i],
        icon: icons[i]
      });
    }
    return playlists;
  }

  static generateTracks(rng, count = 12) {
    const titles = [
      'Midnight Dreams',
      'Neon Lights',
      'Summer Breeze',
      'Electric Pulse',
      'Starlight',
      'Ocean Waves',
      'Mountain High',
      'City Streets',
      'Golden Hour',
      'Midnight Run',
      'Infinite Loop',
      'Cosmic Journey'
    ];

    const artists = [
      'The Wanderers',
      'Echo System',
      'Lunar Phases',
      'Digital Souls',
      'Velocity Band',
      'Neon Dreams',
      'Cosmic Rays',
      'Aurora Lights'
    ];

    const tracks = [];
    for (let i = 0; i < count; i++) {
      const mins = rng.int(2, 7);
      const secs = rng.int(0, 59);
      tracks.push({
        title: titles[i % titles.length],
        artist: artists[rng.int(0, artists.length - 1)],
        albumArt: ['🎵', '🎶', '🎼', '🎧'][rng.int(0, 3)],
        duration: `${mins}:${secs < 10 ? '0' : ''}${secs}`
      });
    }
    return tracks;
  }

  static generateCurrentTrack() {
    return {
      title: 'Midnight Dreams',
      artist: 'The Wanderers',
      album: 'Echoes of Tomorrow',
      albumArt: '🎵'
    };
  }
}
