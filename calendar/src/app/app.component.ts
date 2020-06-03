import { Component, ViewChild  } from '@angular/core';

import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ]
})
export class AppComponent {
  title = 'calendar';
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  date
  dateday
  dateyear
  datemonth
  calendarVisible = true;
  show=false
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
 

  formupdate(form:NgForm){
    if(form.invalid){return alert('title should not be empty')}
    console.log(form)
    this.calendarVisible = !this.calendarVisible;
    document.getElementById('event-container').style.display="none";
    console.log(form.value.title)
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      title: form.value.title,
      description:form.value.description,
      start: this.date,
      Day:this.date.getDate(),
      Year:this.date.getFullYear(),
      month:this.date.getMonth()
    })
    console.log(this.calendarEvents)
    form.resetForm()
  }



  handleDateClick(arg) {
   
      this.date=arg.date;
      this.dateday=arg.date.getDate()
      this.dateyear=arg.date.getFullYear()
      this.datemonth=arg.date.getMonth()
      this.calendarVisible = !this.calendarVisible;
      document.getElementById('event-container').style.display="block";

    }

    editedvalue(dates){
      console.log(dates)
      var ind=this.calendarEvents.indexOf(dates)
      this.calendarEvents[ind].title=(<HTMLInputElement>document.getElementById("editedvaluetxt")).value;
      this.calendarEvents[ind].description=(<HTMLInputElement>document.getElementById("desc")).value;
    }
    editlistallevents(event){
      var ind=this.calendarEvents.indexOf(event)
      this.calendarEvents[ind].title=(<HTMLInputElement>document.getElementById("titlename")).value;
      this.calendarEvents[ind].description=(<HTMLInputElement>document.getElementById("descr")).value;
    }

    deleteevent(event){
      var ind=this.calendarEvents.indexOf(event);
      if(ind>-1){
      this.calendarEvents.splice(ind,1)}
    }

    hideevents(){
      this.calendarVisible = !this.calendarVisible;
      
      document.getElementById('event-container').style.display="none";
    }
    searchEvent(){
      var txt=(<HTMLInputElement>document.getElementById("eventtitle")).value;
      console.log(txt)
      for (let i of this.calendarEvents){
        
        if(i.title===txt){
          console.log(i.title,txt,i.start);
          let calendarApi = this.calendarComponent.getApi();
          var ddate=i.Year+'-'
          var mnt=i.month+1
          var day=i.Day
          if(mnt<10){ddate+='0'+mnt+'-'}

          else{ddate+=mnt+'-'}
          if(day<10){
            ddate+='0'+day
          }
          else{ddate+=day}
          
          console.log(ddate)
          calendarApi.gotoDate(ddate);
        }
      }
      (<HTMLInputElement>document.getElementById("eventtitle")).value="";
    }
    listevents()
    {
      this.show=true;
       document.getElementById('event-container').style.display="none";
      this.calendarVisible = false;
    }
    closeevents(){
      this.show=false;
      this.calendarVisible = !this.calendarVisible;
    }
  
}
