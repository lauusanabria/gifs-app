import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY: string = '5T3DUZsV2sh4vkkNsTJRFTUgh7msDeHe';
@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceBase: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadTagHistory();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeTag(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceBase}/search`, { params })
      .subscribe((response) => (this.gifList = response.data));

    /*
    fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=5T3DUZsV2sh4vkkNsTJRFTUgh7msDeHe&q=valorant&limit=10'
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));*/
  }

  private organizeTag(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveTagHistory();
  }

  private saveTagHistory(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadTagHistory(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length > 0) this.searchTag(this._tagsHistory[0]);
  }
}
