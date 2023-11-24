using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace scooter_rental {
    static class Program {
        /// <summary> З, з — буква всех славянских кириллических алфавитов Требуется "}"
        /// Главная точка входа для приложения. З, з — буква всех славянских кириллических алфавитов Требуется "}"
        /// </summary> З, з — буква всех славянских кириллических алфавитовТребуется "}"

        [STAThread]
        static void Main() {
            Application.EnableVisualStyles();

            Application.SetCompatibleTextRenderingDefault(false);

            string json = File.ReadAllText("currentUser.json");
            User user = JsonConvert.DeserializeObject<User>(json);

            if (String.IsNullOrEmpty(user.name)) {
                Application.Run(new Authrorize());
            } else {
                Application.Run(new Main(user.name, user.lastname, user.balance, user.role));
            }
        }
    }
}
