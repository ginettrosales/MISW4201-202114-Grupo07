import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '../album.service';
import { Album, Medio } from '../album';
import { AlbumComment } from './album-comment';
import { Coment } from './coment';

import * as $ from 'jquery';

@Component({
  selector: 'app-album-comment',
  templateUrl: './album-comment.component.html',
  styleUrls: ['./album-comment.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AlbumCommentComponent implements OnInit {
  album: Album
  userId: number
  token: string
  albumCommentForm: FormGroup

  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  ngOnInit() {


    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.getAlbum()
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.albumCommentForm = this.formBuilder.group({
        comentario: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
      })
    }


    //Toggle Click Function
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

  }


  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El comentario para el album fue creado`, "Creación exitosa");
  }

  cancelCreate() {
    this.albumCommentForm.reset()
    this.routerPath.navigate([`/albumes/${this.userId}/${this.token}`])
  }

  getAlbum() {
    this.albumService.getAlbum(this.router.snapshot.params.albumId)
      .subscribe(com => {
        this.album = com;

      },
        error => {
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }

  createAlbumComment(newComment: AlbumComment) {
    var idUsuario = this.router.snapshot.params.userId;
    var idAlbum = this.router.snapshot.params.albumId;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var minutes = today.getMinutes();
    var hour = today.getHours();


    var ddT = '' + dd;
    var mmT = '' + mm;

    if (dd < 10) {
      ddT = '0' + dd;
    }

    if (mm < 10) {
      mmT = '0' + mm;
    }

    var fecha = yyyy + '/' + mmT + '/' + ddT;


    var minutesT = '' + minutes;
    var hourT = '' + hour;
    if (minutes < 10) {
      minutesT = '0' + minutes;
    }

    if (hour < 10) {
      hourT = '0' + hour;
    }

    var hora = hourT + ':' + minutesT;

    var comment = new Coment(newComment.comentario, fecha, hora, idAlbum, idUsuario);
    console.log(comment)

    this.albumService.comentarAlbum(this.token, comment)
      .subscribe(com => {
        this.showSuccess()
        this.albumCommentForm.reset()
        this.routerPath.navigate([`/albumes/${this.userId}/${this.token}`])
      },
        error => {
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }


}
