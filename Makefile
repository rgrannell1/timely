
BIN          = ./node_modules/.bin
ESLINT       = $(BIN)/eslint
ESLINT_FLAGS = --config config/eslint





CODE_PATH = timely/



eslint:
	$(ESLINT) $(ESLINT_FLAGS) $(CODE_PATH)

snap:
	cd snapcraft && snapcraft clean && snapcraft snap && cd ..

install: snap
	cd snapcraft && snap install timely_* && cd ..
