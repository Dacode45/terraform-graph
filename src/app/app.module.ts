import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphGridComponent } from './components/graph/graph-grid/graph-grid.component';
import { GraphNodeComponent } from './components/graph/graph-node/graph-node.component';
import { DraggableDirective } from './directives/graph/draggable.directive';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { NodesState } from './states/graph/nodes.state';
import { DebugState } from './states/graph/debug.state';
import { GraphSocketComponent } from './components/graph/graph-socket/graph-socket.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphGridComponent,
    GraphNodeComponent,
    DraggableDirective,
    GraphSocketComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      NodesState,
      DebugState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
