from .base import *  # noqa: F403, F401


INSTALLED_APPS += [
    "debug_toolbar",
]
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

ALLOWED_HOSTS = ["*"]

ADMIN_URL = os.environ.get("DJANGO_ADMIN_URL", "admin/")

# Media files (Images, etc.)
MEDIA_URL = "media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
STATIC_URL = "/app/static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "staticfiles")]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "[{asctime} {name}: {levelname}] {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",  # Added formatter
        },
        "app_console": {  # This handler is now assigned to a logger
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate": True,
        },
        "scripts": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": False,  # Prevent duplicate logs
        },
        "djangoindia": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": False,  # Prevent duplicate logs
        },
    },
}

# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#middleware
MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "djangoindia.middleware.LogResponseTimeMiddleware",
]  # noqa: F405
# https://django-debug-toolbar.readthedocs.io/en/latest/configuration.html#debug-toolbar-config
DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": ["debug_toolbar.panels.redirects.RedirectsPanel"],
    "SHOW_TEMPLATE_CONTEXT": True,
}
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ["127.0.0.1"]
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: True,
}
