import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

class Hair_model:
    def train(self):
        hair_loss_data = pd.read_csv('hair_loss_data.csv')
        hair_loss_data = hair_loss_data.iloc[:, 1:]
        X_train, X_test, y_train, y_test = train_test_split(
            hair_loss_data.drop('Hair Loss', axis=1),
            hair_loss_data['Hair Loss'],
            test_size=0.2,
            random_state=42
        )
        hair_loss_model = LogisticRegression(max_iter=1000)
        hair_loss_model.fit(X_train, y_train)
        y_pred = hair_loss_model.predict(X_test)
        report = classification_report(y_test, y_pred.round())
        accuracy = accuracy_score(y_test, y_pred.round())
        joblib.dump(hair_loss_model, 'models/hair_loss_model.pkl')
        print("Hair Loss Model Report prediction : {}".format(y_pred))
        print(report)
        print(f'Accuracy: {accuracy:.2f}')