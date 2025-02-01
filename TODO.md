# TODO list


### File management
 - Popup a native dialog, probably using tauri dialog extension to choose a directory
 - Read full tree in directory, create list of files in memory
 - Extra: Style filenames based on compression opportunity, at first just do jpg
 - Extra: Allow opening a file  using tauri opener
 - Add button that starts process
 - Extra: Make sure progress is shown
 - Extra: Show totals
 - Use tauri fs to access the files chosen in the dialog
 - Save processed files to disk automatically
 - Extra: tooltips for starting process, stopping process, explainers

### Log viewer
 - Show live logs of everything we do for better user comms and easy debug

### Extra: Config section:
 - Keep png lossless
 - Keep jpg => jxl lossless
 - Max worker count
 - Add section on file naming
 - Allow user to choose "effort" for videos


### Extra: Estimation
 - Keep track of time spent in all workers and MB processed
 - For images estimate based on total MB size
 - For videos estimate based on total mpix to process

### Extra: Compression
 - Use native library for faster compression when doing conv to jxl
 - Allow compressing videos
 - Figure out most sensible av1 or vp9 settings
 