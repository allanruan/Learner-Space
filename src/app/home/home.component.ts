import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {BookmarkService} from '../home/homeService';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bookmark, Source } from '../models/bookmark';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notify:string;
  errors:any=[];
  counter=1;
  searchId:number;
  formData:any = {};
  source:any={};
  sources:Source[]=[];
  bookmarkForm:FormGroup;
  bookmarks:Bookmark[];
  flag=1

  constructor( private fb:FormBuilder,  public auth:AuthService,
    private router: Router, private route: 
    ActivatedRoute,private bookmarkService:BookmarkService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
        setTimeout(()=>this.notify='',3000)
      }
    });
    this.initBookmarkForm();
    this.getBookmark();
  }
  initBookmarkForm(): void {
    this.formData={owner:this.auth.getUserid(),name:''};
    this.source={};
  }
  getBookmark():void{
    console.log("getting Bookmark");
    console.log(this.formData);
    this.bookmarkService.getBookmarks(this.formData).subscribe(result => {
      this.bookmarks = result;
      console.log(this.bookmarks);
      this.flag=1;
    })
  }
  
    // getForm():void{
    //   this.flag=2;
    // }
    // updateForm(id,owner,desc, deadline, priority, reward, status){
    //   this.formData._id=id;
    //   this.formData.owner=owner;
    //   this.formData.desc=desc;
    //   this.formData.deadline=deadline;
    //   this.formData.priority=priority;
    //   this.formData.reward=reward;
    //   this.formData.status=status;
    //   this.flag=3;
    // }
    addSourceById():void{
      console.log(this.formData);
      this.bookmarkService.addSourceById(this.source,this.formData._id).subscribe(() => {
        this.flag=1;
        this.router.navigate([''], { queryParams: { updated: 'success' } });
        this.getBookmark();
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
      });
      this.formData={owner:this.auth.getUserid()};
    }
    addBookmark():void{
      this.sources.push(this.source);
      this.formData.source =  this.source
      console.log(this.formData)
      this.bookmarkService.addBookmark(this.formData)
        .subscribe(() => {
          this.flag=1;
          this.router.navigate([''], { queryParams: { saved: 'success' } });
          this.getBookmark();
          this.initBookmarkForm();
        },
          (errorResponse) => {
            this.errors.push(errorResponse.error.error);
      });
      this.formData={owner:this.auth.getUserid()};
      }
    // getBookmarkById():void{
    //   // console.log(this.searchId)
    //   this.bookmarkService.getBookmarksById(this.searchId).subscribe(result => {
    //     this.bookmarks = [result];
    //     console.log(this.bookmarks);
    //     this.flag=1;
    //     this.getBookmark();
    //   });
    // }
    updateSourceById():void{
      console.log(this.formData);
      this.bookmarkService.updateSourceById(this.source,this.formData._id).subscribe(() => {
        this.flag=1;
        this.router.navigate([''], { queryParams: { updated: 'success' } });
        this.getBookmark();
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
      });
      this.formData={owner:this.auth.getUserid()};
    }
    updateBookmarkById():void{
      console.log(this.formData);
      this.bookmarkService.updateBookmarkById(this.formData,this.formData._id).subscribe(() => {
        this.flag=1;
        this.router.navigate([''], { queryParams: { updated: 'success' } });
        this.getBookmark();
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
      });
      this.formData={owner:this.auth.getUserid()};
    }
  
    deleteBookmarkById(id):void{
      // console.log(id);
      this.flag=0;
      this.bookmarkService.deleteBookmarkById(id).subscribe(() => {
        this.router.navigate([''], { queryParams: { deleted: 'success' } });
        this.getBookmark();
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
    }
    deleteSourceById(bid,sid):void{
      this.source._id=sid;
      this.formData._id=bid;
      console.log("In Delete")
      console.log(this.formData);
      console.log(this.source);
      this.bookmarkService.deleteSourceById(this.source,this.formData._id).subscribe(() => {
        this.flag=1;
        this.router.navigate([''], { queryParams: { updated: 'success' } });
        this.getBookmark();
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
      });
      this.formData={owner:this.auth.getUserid()};
    }
    addSource(bid): void {
      const dialogRef = this.dialog.open(SourceDialog, {
        width: '250px',
        data: {_id:this.source.id,sourcename:this.source.sourcename,sourceurl:this.source.sourceurl}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.source = result;
        this.formData._id=bid;
        console.log(this.formData._id);
        console.log(this.source);
        this.addSourceById();
      });
    }
  
    nodeDialog(id): void {
      const dialogRef = this.dialog.open(NodeDialog, {
        width: '250px',
        data: {name: this.formData.name},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.formData.name = result;
        this.formData._id = id;
        this.updateBookmarkById();
      });
    }
    sourceDialog(bid,sid): void {
      this.source._id=sid;
      const dialogRef = this.dialog.open(SourceDialog, {
        width: '250px',
        data: {_id:this.source.id,sourcename:this.source.sourcename,sourceurl:this.source.sourceurl}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.source = result;
        this.formData._id=bid;
        console.log(this.formData._id);
        console.log(this.source);
        this.updateSourceById();
        // this.formData._id = id;
        // this.updateBookmarkById();
      });
    }
  }

  @Component({
    selector: 'node-Dialog',
    templateUrl: './nodeDialog.html',
  })
  export class NodeDialog {
    constructor(
      public dialogRef: MatDialogRef<NodeDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Bookmark,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  @Component({
    selector: 'source-Dialog',
    templateUrl: './sourceDialog.html',
  })
  export class SourceDialog {
    constructor(
      public dialogRef: MatDialogRef<SourceDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Source,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }


