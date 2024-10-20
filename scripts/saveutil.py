import sys,shutil,os,json;
from pathlib import Path;
class SaveUtil:
    def __init__(self):pass;
    def compileToFile(self,dir):
        print("compiling file to binary");
        shutil.make_archive(dir,"zip",dir);
        with Path(f"{dir}.zip") as p:p.rename("todura-savefile.tsf");

    def createSaveFile(self,data):
        # print(os.getcwd());
        if os.path.exists("temp"):
            shutil.rmtree('temp')
            print("temp dir exists. this could be result of incorrect shutdown of program or manual creation. it had been removed");
        os.mkdir("temp");
        print("created temp dir");
        os.chdir("temp");
        data_parsed=json.loads(data); 
        # print(data_parsed["saveId"]);
        os.mkdir(data_parsed["saveId"]);
        os.chdir(data_parsed["saveId"]);
        if os.path.exists("data.json"):
            os.remove("data.json");
            print("'data.json' exists. removing...");
        with open("data.json","x") as f:
            json.dump(data_parsed,f,indent=2);
            f.close();
        print("created file data");
        os.chdir('..');
        self.compileToFile(data_parsed["saveId"]);
        print("moving file to desktop")
        shutil.move("todura-savefile.tsf",os.path.join(os.path.join(os.environ['USERPROFILE']),'Downloads'));
        print("done!")

if sys.argv[1]=="createSaveFile" or sys.argv[1]=="csf":
    SaveUtil().createSaveFile(sys.argv[2]);
