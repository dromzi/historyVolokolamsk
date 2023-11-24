namespace scooter_rental
{
    partial class Authrorize
    {
        /// <summary>
        /// Обязательная переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }
        #region Код, автоматически созданный конструктором форм Windows

        /// <summary>
        /// Требуемый метод для поддержки конструктора — не изменяйте 
        /// содержимое этого метода с помощью редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Authrorize));
            this.label1 = new System.Windows.Forms.Label();
            this.login_auth = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.password_auth = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.authorize_button = new System.Windows.Forms.Button();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.reg_link = new System.Windows.Forms.Label();
            this.Error = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 21.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label1.Location = new System.Drawing.Point(105, 39);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(190, 33);
            this.label1.TabIndex = 0;
            this.label1.Text = "Авторизация";
            // 
            // login_auth
            // 
            this.login_auth.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.25F);
            this.login_auth.Location = new System.Drawing.Point(35, 163);
            this.login_auth.Name = "login_auth";
            this.login_auth.Size = new System.Drawing.Size(338, 31);
            this.login_auth.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.label2.Location = new System.Drawing.Point(32, 143);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(47, 17);
            this.label2.TabIndex = 2;
            this.label2.Text = "Логин";
            // 
            // password_auth
            // 
            this.password_auth.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.25F);
            this.password_auth.Location = new System.Drawing.Point(35, 243);
            this.password_auth.Name = "password_auth";
            this.password_auth.Size = new System.Drawing.Size(338, 31);
            this.password_auth.TabIndex = 3;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.25F);
            this.label3.Location = new System.Drawing.Point(32, 223);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(57, 17);
            this.label3.TabIndex = 4;
            this.label3.Text = "Пароль";
            // 
            // authorize_button
            // 
            this.authorize_button.BackColor = System.Drawing.Color.Red;
            this.authorize_button.FlatAppearance.BorderColor = System.Drawing.Color.Black;
            this.authorize_button.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.authorize_button.Font = new System.Drawing.Font("Microsoft Sans Serif", 20.25F);
            this.authorize_button.Location = new System.Drawing.Point(111, 329);
            this.authorize_button.Name = "authorize_button";
            this.authorize_button.Size = new System.Drawing.Size(184, 49);
            this.authorize_button.TabIndex = 5;
            this.authorize_button.Text = "Войти";
            this.authorize_button.UseVisualStyleBackColor = false;
            this.authorize_button.Click += new System.EventHandler(this.authorize_button_Click);
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackColor = System.Drawing.Color.Transparent;
            this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(-43, 419);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(202, 192);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pictureBox1.TabIndex = 7;
            this.pictureBox1.TabStop = false;
            // 
            // pictureBox2
            // 
            this.pictureBox2.BackColor = System.Drawing.Color.Transparent;
            this.pictureBox2.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox2.Image")));
            this.pictureBox2.Location = new System.Drawing.Point(341, 258);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(169, 194);
            this.pictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pictureBox2.TabIndex = 8;
            this.pictureBox2.TabStop = false;
            // 
            // reg_link
            // 
            this.reg_link.AutoSize = true;
            this.reg_link.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.reg_link.Location = new System.Drawing.Point(80, 398);
            this.reg_link.Name = "reg_link";
            this.reg_link.Size = new System.Drawing.Size(255, 20);
            this.reg_link.TabIndex = 9;
            this.reg_link.Text = "Нет аккаунта? Зарегистрируйся";
            this.reg_link.Click += new System.EventHandler(this.reg_link_Click);
            // 
            // Error
            // 
            this.Error.BackColor = System.Drawing.SystemColors.Control;
            this.Error.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.Error.Cursor = System.Windows.Forms.Cursors.Default;
            this.Error.Enabled = false;
            this.Error.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.Error.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.Error.HideSelection = false;
            this.Error.ImeMode = System.Windows.Forms.ImeMode.Off;
            this.Error.Location = new System.Drawing.Point(96, 289);
            this.Error.Name = "Error";
            this.Error.ReadOnly = true;
            this.Error.ShortcutsEnabled = false;
            this.Error.Size = new System.Drawing.Size(215, 17);
            this.Error.TabIndex = 10;
            this.Error.TabStop = false;
            this.Error.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // Authrorize
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Control;
            this.ClientSize = new System.Drawing.Size(406, 590);
            this.Controls.Add(this.Error);
            this.Controls.Add(this.reg_link);
            this.Controls.Add(this.authorize_button);
            this.Controls.Add(this.password_auth);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.login_auth);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.pictureBox2);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "Authrorize";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Авторизация";
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.Authrorize_FormClosed);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox login_auth;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox password_auth;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button authorize_button;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.PictureBox pictureBox2;
        private System.Windows.Forms.Label reg_link;
        private System.Windows.Forms.TextBox Error;
    }
}

