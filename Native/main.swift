//
//  main.swift
//  SafariURLLauncher
//
//  Created by Muthuraj Ramalinga kumar on 30/01/19.
//

import Foundation


let args = CommandLine.arguments
let argCount = CommandLine.argc
if (argCount != 2) {
    print("The safari url launcher app needs exactly one argument. Exiting with code: 1")
    exit(1)
}
let userUrl = args[1]
let url = URL(string: userUrl)
let safariString = CFStringCreateCopy(nil, "Safari" as CFString)

let safariApp = URL(string: "file:///Applications/Safari.app" ) as CFURL?

let safariUnManagedURL = Unmanaged<CFURL>.passUnretained(safariApp!)

let userURLs: CFArray = [url] as CFArray
let unManagedUserURLs = Unmanaged<CFArray>.passUnretained(userURLs)

var launchSpec = LSLaunchURLSpec(appURL: safariUnManagedURL, itemURLs: unManagedUserURLs, passThruParams: nil, launchFlags: LSLaunchFlags.newInstance, asyncRefCon: nil)

let stat = LSOpenFromURLSpec(&launchSpec, nil)
if (stat == 0) {
    print("success:", stat)
    exit(0)
} else {
    print("error:", stat)
    exit(1)
}


