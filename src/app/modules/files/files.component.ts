import { Component,Input, OnInit,ViewChild ,OnChanges} from '@angular/core';
import { ApiService } from '../../api.service'
import {VirtualScrollerModule} from 'primeng/virtualscroller';
interface datastr {
  x;
  y;
  
}
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit,OnChanges {
  @Input() datafromparent;

  constructor(private service: ApiService) { }
  data: datastr[];
  ngOnInit(): void {
    // this.data.push({x:'a',y:'sewew'},
    // {x:'aaa',y:'sewew'})
    this.loadFile()
  }
  ngOnChanges(){
    console.log(this.datafromparent)
  }

  loadFile() {
    this.service.getCSV({}).subscribe(res => {
      this.data = res;
      console.log(this.data.length)
      
    })
  }

}
