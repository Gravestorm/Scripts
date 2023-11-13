import sys, json
from pydofus.d2i import D2I, InvalidD2IFile

path_input = "C:\\Users\\PC\\AppData\\Local\\Ankama\\Dofus\\data\\i18n\\i18n_en.d2i"
path_output = "C:/Scripts/Dofus/Data/i18n_en.json"

d2i_input = open(path_input, "rb")
json_output = open(path_output, "w", encoding="utf-8")

d2i = D2I(d2i_input)
data = d2i.read()

json.dump(data, json_output, indent=2, ensure_ascii=False)

d2i_input.close()
json_output.close()
