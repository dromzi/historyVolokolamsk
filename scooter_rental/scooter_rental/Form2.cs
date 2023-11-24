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
    public partial class Register : Form
    {
        public Register()
        {
            InitializeComponent();
        }

        private void label8_Click(object sender, EventArgs e)
        {
            Authrorize form = new Authrorize();
            form.Show();
            this.Hide();
        }

        string reg(string name, string lastname, string login, string password, string repeatPassword, string phone) {
            if (name == "" || lastname == "" || login == "" || password == "" || repeatPassword == "" || phone == "+7 (   )    -")
                return "Заполните все поля";
            if (name.Length > 10)
                return "Имя должно быть не длинее 10 символов";
            if (lastname.Length > 15)
                return "Фамилия должна быть не длинее 15 символов";

            if (password != repeatPassword)
                return "Пароли не совпадают";

            string jsonUsers = File.ReadAllText("users.json");
            List<User> users = JsonConvert.DeserializeObject<List<User>>(jsonUsers);

            foreach (User user in users) {
                if (user.login == login) {
                    return "Пользователь с таким логином уже есть";
                }
            }

            User newUser = new User(name, lastname, login, password, phone, "user");
            users.Add(newUser);

            string json = JsonConvert.SerializeObject(users);
            File.WriteAllText("users.json", json);

            string json2 = JsonConvert.SerializeObject(newUser);
            File.WriteAllText("currentUser.json", json2);

            return "";
        }

        private void button1_Click(object sender, EventArgs e) {
            string name = nameReg.Text;
            string lastname = sec_nameReg.Text;
            string phone = phoneReg.Text;
            string login = login_regis.Text;
            string password = password_regis.Text;
            string repeat = repeatPassword.Text;

            string error = reg(name, lastname, login, password, repeat, phone);

            if(error == "") {
                string json = File.ReadAllText("currentUser.json");
                User user = JsonConvert.DeserializeObject<User>(json);

                new Main(user.name, user.lastname, user.balance, user.role).Show();
                this.Hide();
            }
            else {
                Error.Text = error;
            }
        }

        private void Register_FormClosed(object sender, FormClosedEventArgs e) {
            Application.Exit();
        }
    }
}
