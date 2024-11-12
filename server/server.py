import modules.logger as console;
from modules.classes import ArgumentError, InitializationError;
from threading import Thread;
import logging,os,sys;
import flask as f;
if(len(sys.argv)<2):raise ArgumentError("1 Argument is Required");
class Server(f.Flask):
    template_dir=os.path.abspath('./pages/');
    def __init__(self,env):
        super().__init__(__name__,template_folder=self.template_dir);
        self.logger=logging.getLogger(f"todurav2_server:{env}");
        self.setupLogger();
        self.setupServer();
        self.startServer();
    
    def setupServer(self):
        @self.route("/")
        def home():
            return f.render_template("index.html");

    def startServer(self):
        self.run(debug=True,host="0.0.0.0",port=2929)

    def setupLogger(self):
        self.logger.setLevel(logging.DEBUG);
        ch=logging.StreamHandler();
        ch.setLevel(logging.DEBUG);
        ch.setFormatter(console.CustomFormatter());
        self.logger.addHandler(ch);

if(__name__=="__main__"):
    if(sys.argv[1]=="dev"\
    or sys.argv[1]=="dist"):
        Server(sys.argv[1]);
    else:raise ArgumentError("Invalid Environment Argument");
else:raise InitializationError("Current program is not primary program");
