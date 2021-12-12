import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmark } from "../models/bookmark";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  // URL to web api
  private bookmarkUrl = 'http://localhost:5000/api/bookmarks';
  constructor(private http: HttpClient) { }

  getBookmarks(bookmark:Bookmark): Observable<Bookmark[]> {
    return this.http.post<Bookmark[]>(this.bookmarkUrl+'/ownbookmarks',bookmark,httpOptions );
  }

  getBookmarksById(id: any): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.bookmarkUrl}/${id}`);
  }
  addBookmark(bookmark: Bookmark): Observable<any> {
    return this.http.post<any>(this.bookmarkUrl, bookmark, httpOptions);
  }

  updateBookmarkById(bookmark: Bookmark, id: any): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.bookmarkUrl}/${id}`, bookmark, httpOptions);
  }

  deleteBookmarkById(id: any): Observable<Bookmark> {
    return this.http.delete<Bookmark>(`${this.bookmarkUrl}/${id}`);
  }

}
