from flask import Flask, render_template, request, redirect


app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    table_headers = [
                    'Name',
                    'Diameter',
                    'Climate',
                    'Terrain',
                    'Surface water percentage',
                    'Population',
                    'Residents'
                    ]
    return render_template('index.html', table_headers=table_headers)


if __name__ == '__main__':
    app.run(debug=True)
