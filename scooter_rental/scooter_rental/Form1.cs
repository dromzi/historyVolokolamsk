using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace scooter_rental
{
    public partial class Authrorize : Form
    {
        public Authrorize()
        {
            InitializeComponent();
        }

        private void reg_link_Click(object sender, EventArgs e)
        {
            Register form = new Register();
            form.Show();
            this.Hide();
        }

        string auth(string login, string password) {
            string jsonUsers = File.ReadAllText("users.json");
            List<User> users = JsonConvert.DeserializeObject<List<User>>(jsonUsers);

            foreach (User user in users) {
                if (user.login == login && user.password == password) {
                    string json = JsonConvert.SerializeObject(user);
                    File.WriteAllText("currentUser.json", json);

                    return "";
                } else if (user.login == login && user.password != password) {
                    return "Пароль не верен";
                }
            }

            return "Такого пользователя нет";
        }

        private void Authrorize_FormClosed(object sender, FormClosedEventArgs e) {
            Application.Exit();
        }

        private void authorize_button_Click(object sender, EventArgs e) { // ЭТО СДЕЛАЛ АРТЁМ
            string login = login_auth.Text;
            string password = password_auth.Text;

            string error = auth(login, password);

            if (error == "") {
                string json = File.ReadAllText("currentUser.json");
                User user = JsonConvert.DeserializeObject<User>(json);

                new Main(user.name, user.lastname, user.balance, user.role).Show();
                this.Hide();
            }
            else {
                Error.Text = error;
            }
        }
    }
}
