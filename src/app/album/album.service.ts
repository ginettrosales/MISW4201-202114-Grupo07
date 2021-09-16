import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from './album';
import { Cancion } from '../cancion/cancion';
import { Coment } from '../album/album-comment/coment';
import { CommentResp } from '../album/album-comment/commentResp';
import { AlbumComp } from './album-list/albumComp';
import { AlbumCompartir } from './album-share/albumCompartir';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private backUrl: string = "http://localhost:5000"

  constructor(private http: HttpClient) { }

  getAlbumes(usuario: number, token: string): Observable<Album[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Album[]>(`${this.backUrl}/usuario/${usuario}/albumes`, { headers: headers })
  }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, { headers: headers })
  }

  crearAlbum(idUsuario: number, token: string, album: Album): Observable<Album> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Album>(`${this.backUrl}/usuario/${idUsuario}/albumes`, album, { headers: headers })
  }

  getAlbum(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${this.backUrl}/album/${albumId}`)
  }

  editarAlbum(idUsuario: number, token: string, albumId: number, album: Album): Observable<Album> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Album>(`${this.backUrl}/album/${albumId}`, album, { headers: headers })
  }

  eliminarAlbum(idUsuario: number, token: string, albumId: number): Observable<Album> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<Album>(`${this.backUrl}/album/${albumId}`, { headers: headers })
  }

  asociarCancion(albumId: number, cancionId: number): Observable<Cancion> {
    return this.http.post<Cancion>(`${this.backUrl}/album/${albumId}/canciones`, { "id_cancion": cancionId })
  }

  comentarAlbum(token: string, coment: Coment): Observable<Coment> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Coment>(`${this.backUrl}/comentarios`, coment, { headers: headers })
  }

  getAlbumComentarios(albumId: number): Observable<CommentResp[]> {
    return this.http.get<CommentResp[]>(`${this.backUrl}/comentarioAlbum/${albumId}`)
  }

  compartirAlbum(idusuario: number, token: string, coment: AlbumCompartir): Observable<AlbumCompartir> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<AlbumCompartir>(`${this.backUrl}/compartirAlbum/${idusuario}`, coment, { headers: headers })
  }
  getAlbumCompartidos(usuario: number, token: string): Observable<AlbumComp[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<AlbumComp[]>(`${this.backUrl}/compartirAlbum/${usuario}`, { headers: headers })
  }

}
