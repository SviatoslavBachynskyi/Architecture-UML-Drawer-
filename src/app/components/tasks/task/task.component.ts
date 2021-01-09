import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TaskPreviewComponent } from './../../../modals/task-preview/task-preview.component';
import { TaskPreview } from './../../../models/taskPreview.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;

  constructor(public matDialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig<TaskPreview>();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "900px";
    dialogConfig.width = "800px";
    dialogConfig.data = { 
      id:1,
      title: 'Фабричний метод',
      image: `iVBORw0KGgoAAAANSUhEUgAAAaQAAAEsCAMAAAC7cTeyAAAAzFBMVEVHcEz////9/f3x8fH/////
      ///////////8/Pzw8PD////////////DxcZvcnPJy8mur6+Rk5OFh4d7fn+ipqKytrG2ubXU1dXT
      1883PT8uNDbp6enn6OibnZ1KT09bX1+lqaXV1tfb3Nu/w73+/v7u7uz///9TV1hhZGX7+/vn6OhD
      SUlUWVn9/f38/f3///9PU1T///9UWFfDx8D////4+PhPVFXboKDBPT26HR3EWVn26Oj25eXESEjq
      wMDx0tLz2Nj9+fnX2Nbm5uamCBzzAAAARHRSTlMACZ/oihgtYK/Nd047//////////////r////d
      9P/////////E/yL///7///+E1ib/3f////D//////93/////////3a1mlwMAAAjLSURBVHgB7NmH
      roM2GIZhL2ICjoMh82MlhuaQM+j9312hew+kIEv9H020BXi+jBBCCCGEEEIIIYQQ8n/Af/skpFQR
      I4HgG63i7SwWKtE6NSZN4p21e8XCQEws95nLi6LI3SE7nnb782V3clfAlhELAVFVfcWfo48UBp6c
      Lf5CE8Z0R4xs8RfsJY4YCYC4YWKz3d17f993p+xWO+fq28n3mpEQRFsLoP4m1mazMSbViRIinojE
      RCwI5FG+AcjvvWGhInzrMCsqxVmgiPYtZsNZs0ARrnyOWd6zgBBuEhH3/Y93QOI5fyYM7ywcJI39
      0eUTd8i6/dlfThaAlSwYJK3qBn90EywUxMgBf6KQm2C6BhEZZtePjyt+9umkDqxr0BWD7S7n82V/
      urnC2sLtfG/C6RrkUX4CKM5Plc53QD9eAW1C6hqEb3NMmrxKOJvwCfvXqGusQ/sPzAavQ+0ahCeV
      u2KS98F1DcIfRidJ8qXG56UFMFShdQ3yEKPvTsdjNqlbAFYG1jVIKm8NfiNTYXUNYkqH33KlCatr
      EJXhN5pMpoF1DSItgKHOsux4PJ46P4ootK5BqgHAcH+OKplo8+DBdQ0y5phc6yrhoXYNov2AWVPp
      FbrGIoR/VfkHJi5eoWssQh5p/7xYAEMZva5rLEc2avSXzg1XAHYbvaxrLEdSeSrervhBJl7WNZYj
      mzG/4idWmhW6BlnWF2YfeTeaFboGWdYXmqI+nsvt17fLu8brkKhsAbTds9eGr9A1yAI8dpgNXvDl
      XeOoGHmhtBowa896la5BFuDJe33FxPUrdQ2ygImr+gMYqpd3DbIcN9ICVi7vGt+1d59djWpfAMYp
      Q4ZRbFg5dh0Jhixir/9yy/f/TLfEEJmSkxM3OSLz/N6C987kWZvFZCdoAbyVi4sVb6a9Rl7uNWCJ
      +6koPrmCvQYscIPAFew18EH3GnIIUq1AuNeQQ+TtTuFFkr2GHAb+atbVylb9gWCvIQY33FdT7Yeu
      dK8BgaDI1VR5EUj3GhBIL5WBy1S+14D1SE51rwE7ka4mKCPJ9xoQRzqdoIwk32tAHGlngjKSdK8B
      C5Gkew1YiCTYa9hCJMFewxYiCfYa1hCp+Ygk2GvYQiTBXsMWIgn2GrYQSbDXsIVIgr2GNUQSvGVe
      ApGIJNhr2EIkwV7DFiLx9gSRQCQBIoFI1hCJr1FEZq97NNvJ9gWt/hpFz+R17816sn1e1N6vUfS7
      Jq97tz/byfa1ZkWiWTdoXnfByVa1aUUSFHk7I+VF0LrbuTZFer+7SiIR6aCkf90FJ9vT2kgbJf3r
      LjjZntZG2izpX3fByfYQiUgTEIlIRCISkYhEJCIFqUBQb6Sjkhq6nkBwsj01Roo86xsTTaS8pH+b
      QHCyPfJI1T1OAzYmg0vVUpeDee1xrG9MOueqpc479e9xLG1MiCRfEVh/M57Lnc1I8lVFKdc7uKo6
      MDjZBuGqQv/i9CsyY/VH2ni1v6V3WrVlcLINGxW1R1qq6BmrP9Jmxc4HtFlRe6TjihtjRCKSISIR
      iUhEIhKRiEQkIhGJSEQiEpGIRCQiEYlIRCISkYhEJCIRaSXOVSPl8QqRRuJENVQSE2kkV42VE2lE
      NVjtkYhEJCIR6axhdJGIRKRzY+8WiUgnxqxHItLsiEQkIhGJSEQikhyReMeBSEQiEpHYJ7U0EpvZ
      oaU3sRSJzzhInpptLxKfFhIiEpGIlNbxlK75RiKS620kSiTZ8FxHj0hCHf9oOXtxoUb62USH46QH
      2dDykd9x9IgkFoV+b+hkXb2IT3oT7a2qkWyn9y8/jBxzRBJZ9OPyH2eF5mUPwpW+enG4HQaOOSLJ
      G+2uqRdrvnY0Am97ubwqLoUde5GI1PHLRrG/6Gi5C3tlpWTra2QlEpGq1zoVF5HB2RvJeOwWXUeA
      SIJrnV70ZTMfzdL63oJrIRKRIuNrXWkQnh6oF8vbnqASkUT3dXru6+3DwdbXjiNAJPG1TnP7sJ6o
      oXzzS+QIEElwX6fnLo5/MNk3/kkiye/rZhJ93UrUi0xw+0Ak4bVObxAuHb7ePgSOAJEE93V6gXec
      vb77kM430vVpI13LI8nv6/QW9tbVyJEfzTHSytrhVSNlayuySPJrncHtw34yvn347M4tUqwaK5ZH
      kt/X6UXFqhpZ31uYW6RENVZiHsnafZ18ecEnWN3UTOVad/Z5kI4ErmPADdKKKDyuLC+idCr3V4/U
      8YpLI2dlo/js/HKsCAcmt97f/T9uzl6XF7eX0xRe562R7hrmbZEi//7hUeDh3o+m37fv50og3/Cj
      N0Y6aZi3RQrvH4XuPWcKb1UJHYW/9JfIbp+kkZ6eA0cr2M2U0LL/S0f6jzjSf59TRyvd7SqhrEck
      ItWCSER6+N//x377/cbQ8GeNI/WXjsdOzm8MnXWJRKQqInXfI9IfDfOTSEzSYcMwSR/uvTsmqcGY
      pA/wHAcm6eNsZpmklbX+QSP111aYpLHrhtopMUnNxyQRiUlikojEJBGJSWKSiMQkMUlEYpKIxCQx
      SURikojEJDFJRGKS5oVJIpK5//33rZNkbumgvs2s5GiNmhypK48k+4xDf23F/KiNzzgwSbH6USw4
      WqOYSdJ87i4XHK1RziSNqJ+RHK0Rk0SkjzZJk77OYH60XkyS7vtJamj2ozVjknTf9FNDsx+tGZNE
      JCaJSSISz3EgEpGI1NpIPKVLHonn3c0kOQrfIdKdEE+OtBCp+c9g1ZM+g1VP/gzWtkVy3FTC+GnG
      Eq5jN1LS8OeCN5+FSPF8G8WCSESy8nsuDoW/q4JIpevm/tYXItlHJCIRiUhEIhKRiEQkIhGJSEQi
      EpGIRCQitTXSRsVpxU8/7W1w1LaNitZGOqi4qvjp9yYMjtp2UNHGSK1DJPuIFBS5aqW8CJy2cMN9
      1Ur7oeu0xsBfzboaF3nyrfxiytEmyFb9gdMikber8+ePphxtBC9y2iVIWydwMBsAAAAAAAAAAAAA
      AAAAAAAAAAAAAAAAAAAAAAD8DeB5K2Pjyvu+AAAAAElFTkSuQmCC`,
      type: 'Породжувальний',
      description:
        'Визначити базовий абстрактний клас "UIElement", який містить у собі метод "CreateElement(): UIElement", що перевизначається у дочірніх класах "HtmlButton" та "HtmlAnchorTag"',
      level: 'Легка',
      bestExecutionTime: new Date(0, 0, 0, 0, 7, 53),
      currentMark: 5,
      marks: 
      [{ task: "Фабричний метод", value: 5, timeSpent: new Date(0, 0, 0, 0, 10, 35), dateCompleted: new Date("2020/12/25"), attemptNumber: 2, },
      { task: "Фабричний метод", timeSpent: new Date(0, 0, 0, 0, 15, 48), value: 4, dateCompleted: new Date("2020/12/24"), attemptNumber: 1, },],
    } ;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TaskPreviewComponent, dialogConfig);
  }

}
