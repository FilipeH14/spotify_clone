import { Injectable } from '@angular/core'
import { SpotifyConfiguration } from 'src/environments/environment'

import Spotify from 'spotify-web-api-js'
import { IUsuario } from '../interfaces/IUsuario'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi?: Spotify.SpotifyWebApiJs
  usuario?: IUsuario

  constructor() { 
    this.spotifyApi = new Spotify()
  }

  async inicializarUsuario() {
    if(!!this.usuario) return true

    const token = localStorage.getItem('token')

    if(!token) return false

    try {
      this.definirAccessToken(token)
      await this.obterSpotifyUsuario()
      return true

    } catch(ex) {
      return false
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi?.getMe()

    console.log(userInfo)
  }

  obterUrlLogin(): string {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`
    const responseType = `response_type=token&show_dialog=true`

    return authEndpoint + clientId + redirectUrl + scopes + responseType
  }

  obterTokenUrlCallback(): string {
    if(!window.location.hash) return ''

    const params = window.location.hash.substring(1).split('&')
    return params[0].split('=')[1]
  }

  definirAccessToken(token: string) {
    this.spotifyApi?.setAccessToken(token)

    localStorage.setItem('token', token)
  }
}
