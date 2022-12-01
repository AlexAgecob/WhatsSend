const {app, BrowserWindow} = require('electron')

app.disableHardwareAcceleration()

const express = require('./api/src/server.js');


function createWindow() {

    let win = new BrowserWindow(
        {width:1200, 
         height:800, 
         webPreferences:{nodeIntegration:true}}
    )
    // win.webContents.openDevTools()
    win.loadURL('http://localhost:3333/')
    
    win.focus();

    
}

app.whenReady().then(createWindow)