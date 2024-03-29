@echo off

rem Set paths
set "quickbms_path=C:\Apps\QuickBMS\quickbms.exe"
set "fsb_aud_extr_path=C:\Apps\QuickBMS\fsb_aud_extr.exe"
set "bms_script=C:\Apps\QuickBMS\Script.bms"
rem C:\Users\PC\AppData\Local\Ankama\Waven\Waven_Data\StreamingAssets\Audio\Banks
set "input_folder=C:\Program Files (x86)\Steam\steamapps\common\Waven\Waven_Data\StreamingAssets\Audio\Banks"
set "output_folder=C:\Media\Waven\Audio"

rem Run QuickBMS
"%quickbms_path%" -Y -S "%fsb_aud_extr_path% #INPUT#" "%bms_script%" "%input_folder%" "%output_folder%"

echo "Extraction completed successfully."
pause
exit /b 0